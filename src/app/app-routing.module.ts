import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () =>
      import('./setting/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule)
  },
  // {
  //   path: 'editor',
  //   loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
  // },
  {
    path: 'article',
    loadChildren: () =>
      import('./article/article.module').then((m) => m.ArticleModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
