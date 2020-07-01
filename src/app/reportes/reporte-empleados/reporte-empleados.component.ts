import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { OnInit, Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { ExportService } from 'src/app/_service/export.service';
import { User } from 'src/app/_model/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from 'src/app/_service/auth-firebase.service';
import { empty } from 'rxjs';
import * as jspdf from 'jspdf';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

interface jsPDFWithPlugin extends jspdf {
  autoTable: (options: UserOptions) => jspdf;
}


@Component({
  selector: 'app-reporte-empleados',
  templateUrl: './reporte-empleados.component.html',
  styleUrls: ['./reporte-empleados.component.css']
})
export class ReporteEmpleadosComponent implements OnInit {

  public user: User;
  reporteEmp = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['cedula', 'nombresCompletos', 'email', 'celular', 'direccion', 'perfil'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private authService: AuthenticationService,
    private excelService: ExportService,
    private afStorage: AngularFireStorage) { }


  ngOnInit() {
    this.userService.listar().subscribe(data => {
      let empleado = [];
      data.forEach((dato: any) => {
        this.user = new User();
        this.user.id = dato.payload.doc.id;
        this.user.cedula = dato.payload.doc.data().cedula;
        this.user.apellido = dato.payload.doc.data().apellido;
        this.user.nombre = dato.payload.doc.data().nombre;
        this.user.email = dato.payload.doc.data().email;
        this.user.celular = dato.payload.doc.data().celular;
        this.user.direccion = dato.payload.doc.data().direccion;
        this.user.perfil = dato.payload.doc.data().perfil;
        if (this.user.id != null) {
          this.afStorage.ref(`empleados/${this.user.id}`).getDownloadURL().subscribe(data => {
            this.user.foto = data;
          });
          empleado.push(this.user);
          this.reporteEmp = empleado;
        }
      });
      this.dataSource = new MatTableDataSource(empleado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportAsXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte_empleados');

  }

  empleadosPDF() {

    var img = new Image();
    img.src = "../../../assets/img/favicon.png  ";
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    var data =dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    let reporteFinalEmp = [];
    this.reporteEmp.forEach((emp: any) => {
      var empTemp = [];
      empTemp.push(emp.cedula);
      empTemp.push(emp.nombre);
      empTemp.push(emp.apellido);
      empTemp.push(emp.email);
      empTemp.push(emp.celular);
      empTemp.push(emp.direccion);
      let cargoEmp: any;
      if (emp.perfil == '7p5Gu8QQLPVvnJIZ7dCC') {
        cargoEmp = 'Administrador';
      } else if (emp.perfil == 'O84lNoQAdvst0LNzOZM8') {
        cargoEmp = 'Mesero';
      }
      empTemp.push(cargoEmp)
      reporteFinalEmp.push(empTemp);
    });
    const pdfEmpleados = new jspdf("portrait", "px", "a4") as jsPDFWithPlugin;
    pdfEmpleados.addImage(data, 'PNG', 10, 10, 30, 30)  
    pdfEmpleados.text("Reporte de empleados - Roti Grillé", 50, 30);
    pdfEmpleados.autoTable({
      margin: {top: 60},
      head: [['Cedula', 'Nombre', 'Apellido', 'Email', 'Contacto', 'Dirección', 'Cargo']],
      body: reporteFinalEmp,
    });
    pdfEmpleados.save("reporteEmpleados.pdf")
  }

}
