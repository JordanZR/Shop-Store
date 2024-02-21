import { Routes } from '@angular/router';
import { ShopModule } from './shop/shop.module';

export const routes: Routes = [
    {path: '', loadChildren:() => import('./shop/shop.module').then((m) => m.ShopModule)}
];
