import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';


import {
  MatDialogModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatOptionModule,
  MatSelectModule,
  MatGridListModule,
  MatToolbarModule,
  MatRadioModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatSidenavModule,
  MatCardModule,
  //MatAccordion,
  MatExpansionModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CarouselComponent } from './carousel/carousel.component';
import { EncabezadoAdminComponent } from './encabezado-admin/encabezado-admin.component';
import { FooterComponent } from './footer/footer.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MenuComponent } from './menu/menu.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { PaginfoComponent } from './paginfo/paginfo.component';
import { CreaEmpleadosComponent } from './empleados/crea-empleados/crea-empleados.component';
import { ModificaEmpleadosComponent } from './empleados/modifica-empleados/modifica-empleados.component';
import { ReporteEmpleadosComponent } from './reportes/reporte-empleados/reporte-empleados.component';
import { ReporteMenuComponent } from './reportes/reporte-menu/reporte-menu.component';
import { ReporteVentasComponent } from './reportes/reporte-ventas/reporte-ventas.component';
import { CreaPlatoComponent } from './menu/crea-plato/crea-plato.component';
import { ModificaPlatoComponent } from './menu/modifica-plato/modifica-plato.component';
import { LoginComponent } from './login/login.component';
import { VerOpinionComponent } from './opiniones/ver-opinion/ver-opinion.component';
import { DetalleOrdenComponent } from './ordenes/detalle-orden/detalle-orden.component';
import { RegisterComponent } from './register/register.component';
import { CreaPromocionComponent } from './promociones/crea-promocion/crea-promocion/crea-promocion.component';
import { ModificaPromocionComponent } from './promociones/modifica-promocion/modifica-promocion/modifica-promocion.component';
import { HomeEmpleadosComponent } from './home-empleados/home-empleados.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { VerRecetaComponent } from './menu/ver-receta/ver-receta.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { CreaPublicidadComponent } from './publicidad/crea-publicidad/crea-publicidad.component';
import { ModificaPublicidadComponent } from './publicidad/modifica-publicidad/modifica-publicidad.component';
import { MessagingService } from './_service/messaging.service';
import { AsyncPipe } from '@angular/common';
import { VerPromocionComponent } from './promociones/ver-promocion/ver-promocion.component';
import { VerPublicidadComponent } from './publicidad/ver-publicidad/ver-publicidad.component';
import { HttpClientModule } from '@angular/common/http';
import { VerPedidoComponent } from './reportes/reporte-ventas/ver-pedido/ver-pedido.component';
import { AceptarOrdenComponent } from './ordenes/aceptar-orden/aceptar-orden.component';
import { RechazarOrdenComponent } from './ordenes/rechazar-orden/rechazar-orden.component';
import { ConfirmacionComponent } from './empleados/confirmacion/confirmacion.component';
import { ConfirmacionPlatoComponent } from './menu/confirmacion-plato/confirmacion-plato.component';
import { ConfirmacionPromocionComponent } from './promociones/confirmacion-promocion/confirmacion-promocion.component';
import { ConfirmaPublicidadComponent } from './publicidad/confirma-publicidad/confirma-publicidad.component';
import { ModificarInicioComponent } from './inicio/modificar-inicio/modificar-inicio.component';
import { InicioMovilComponent } from './inicio/inicio-movil.component';
import { VerInicioComponent } from './inicio/ver-inicio/ver-inicio.component';
import { ConfirmaInicioComponent } from './inicio/confirma-inicio/confirma-inicio.component';
import { CrearInicioComponent } from './inicio/crear-inicio/crear-inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    CarouselComponent,
    EncabezadoAdminComponent,
    FooterComponent,
    EmpleadosComponent,
    ReportesComponent,
    MenuComponent,
    OpinionesComponent,
    OrdenesComponent,
    PromocionesComponent,
    PaginfoComponent,
    CreaEmpleadosComponent,
    ModificaEmpleadosComponent,
    ReporteEmpleadosComponent,
    ReporteMenuComponent,
    ReporteVentasComponent,
    CreaPlatoComponent,
    ModificaPlatoComponent,
    LoginComponent,
    VerOpinionComponent,
    DetalleOrdenComponent,
    RegisterComponent,
    CreaPromocionComponent,
    ModificaPromocionComponent,
    HomeEmpleadosComponent,
    FiltroPipe,
    VerRecetaComponent,
    CategoriaComponent,
    PublicidadComponent,
    CreaPublicidadComponent,
    ModificaPublicidadComponent,
    VerPromocionComponent,
    VerPublicidadComponent,
    VerPedidoComponent,
    AceptarOrdenComponent,
    RechazarOrdenComponent,
    ConfirmacionComponent,
    ConfirmacionPlatoComponent,
    ConfirmacionPromocionComponent,
    ConfirmaPublicidadComponent,
    InicioMovilComponent,
    CreaPromocionComponent,
    ModificarInicioComponent,
    VerInicioComponent,
    ConfirmaInicioComponent,
    CrearInicioComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    MatSliderModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    AngularFireStorageModule,
    MatCarouselModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
    MatSidenavModule,
    MatCardModule,
    //MatAccordion,
    MatExpansionModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [
    DetalleOrdenComponent,
    CreaEmpleadosComponent,
    ModificaEmpleadosComponent,
    ModificaPlatoComponent,
    CreaPlatoComponent
  ],
  providers: [
    AngularFirestore,
    MessagingService, AsyncPipe,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
