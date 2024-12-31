import { CanActivateChildFn, Router } from '@angular/router';
import { Global } from '../admin/dto/dtos';
import { StorageService } from './storage.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const router = new Router()
  const localStorage = new StorageService();
  const token = localStorage.getItem(Global.key_token)

  if(token){
    return true
  }
  alert("login first")
  router.navigate([''])
  return false;
};
