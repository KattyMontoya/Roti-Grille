import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { VerRecetaComponent } from './menu/ver-receta/ver-receta.component'
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginGuardService } from './_service/login-guard.service';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { CreaPublicidadComponent } from './publicidad/crea-publicidad/crea-publicidad.component';
import { ModificaPublicidadComponent } from './publicidad/modifica-publicidad/modifica-publicidad.component';
import { VerPromocionComponent } from './promociones/ver-promocion/ver-promocion.component';
import { VerPublicidadComponent } from './publicidad/ver-publicidad/ver-publicidad.component';
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


const routes: Routes = [
  { path: 'homeAdmin', component: EncabezadoAdminComponent, canActivate: [LoginGuardService] },
  { path: 'homeEmpleado', component: HomeEmpleadosComponent, canActivate: [LoginGuardService] },
  { path: 'inicio', component: CarouselComponent },
  {
    path: 'empleados', component: EmpleadosComponent, children: [
      { path: 'creaEmpleados/:id', component: CreaEmpleadosComponent },
      { path: 'modificaEmpleados/:id', component: ModificaEmpleadosComponent },
      { path: 'confirmacionEliminar/:id', component: ConfirmacionComponent }
    ], canActivate: [LoginGuardService]
  },
  { path: 'reportes', component: ReportesComponent, canActivate: [LoginGuardService] },
  { path: 'reporteEmpleados', component: ReporteEmpleadosComponent, canActivate: [LoginGuardService] },
  { path: 'reporteMenu', component: ReporteMenuComponent, canActivate: [LoginGuardService] },
  { path: 'reporteVentas', component: ReporteVentasComponent, canActivate: [LoginGuardService] },
  { path: 'verPedido', component: VerPedidoComponent, canActivate: [LoginGuardService] },

  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'creaPlato/:id', component: CreaPlatoComponent },
      { path: 'creaCategoria/:id', component: CategoriaComponent },
      { path: 'modificaPlato/:id', component: ModificaPlatoComponent },
      { path: 'verReceta/:id', component:  VerRecetaComponent},
      { path: 'confirmacionEliminarPlato/:id', component:  ConfirmacionPlatoComponent}
    ], canActivate: [LoginGuardService]
  },
  {
    path: 'opiniones', component: OpinionesComponent, children: [
      { path: 'verOpinion/:id', component: VerOpinionComponent },
    ], canActivate: [LoginGuardService]
  },
  {
    path: 'ordenes', component: OrdenesComponent, children: [
      { path: 'detalle-orden/:id', component: DetalleOrdenComponent },
      { path: 'aceptar-orden/:id', component: AceptarOrdenComponent },
      { path: 'rechazar-orden/:id', component: RechazarOrdenComponent },
    ], canActivate: [LoginGuardService]
  },
  {
    path: 'detalle-orden/:id', component: OrdenesComponent, children: [
      { path: 'aceptar-orden/:id', component: AceptarOrdenComponent },
      { path: 'rechazar-orden/:id', component: RechazarOrdenComponent },
    ], canActivate: [LoginGuardService]
  },
  {
    path: 'promociones', component: PromocionesComponent, children: [
      { path: 'creaPromocion/:id', component: CreaPromocionComponent },
      { path: 'modificaPromocion/:id', component: ModificaPromocionComponent },
      { path: 'verPromocion/:id', component:  VerPromocionComponent},
      { path: 'confirmacionEliminarPromo/:id', component:  ConfirmacionPromocionComponent}
    ], canActivate: [LoginGuardService]
  },

  {
    path: 'publicidad', component: PublicidadComponent, children: [
      { path: 'creaPublicidad/:id', component: CreaPublicidadComponent },
      { path: 'modificaPublicidad/:id', component: ModificaPublicidadComponent },
      { path: 'verPublicidad/:id', component:  VerPublicidadComponent},
      { path: 'confirmarEliminarPublicidad/:id', component:  ConfirmaPublicidadComponent}
    ], canActivate: [LoginGuardService]
  },

  {
    path: 'inicio-movil', component: InicioMovilComponent, children: [
      { path: 'creaInicio/:id', component: CrearInicioComponent },
      { path: 'modificaInicio/:id', component: ModificarInicioComponent },
      { path: 'verInicio/:id', component:  VerInicioComponent},
      { path: 'confirmarEliminarInicio/:id', component:  ConfirmaInicioComponent}
    ], canActivate: [LoginGuardService]
  },

  // { path: 'paginfo', component: PaginfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'homeEmpleado', component: HomeEmpleadosComponent, canActivate: [LoginGuardService] },
  { path: '', component: CarouselComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
