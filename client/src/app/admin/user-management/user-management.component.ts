import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModelsComponent } from '../../modals/roles-modal/roles-models.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{

  private adminService = inject(AdminService);
  private modalService = inject(BsModalService);
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModelsComponent> = new BsModalRef<RolesModelsComponent>()

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  openRolesModal(user: User){
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User Roles',
        username: user.username,
        selectedRoles: [...user.roles], 
        availableRoles: ['Admin','Moderator','Member'],
        users: this.users,
        rolesUpdated: false
      }
    }
    this.bsModalRef = this.modalService.show(RolesModelsComponent, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () =>{
        if(this.bsModalRef.content && this.bsModalRef.content.rolesUpdated){
          const selectedRoles = this.bsModalRef.content.selectedRoles;
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users = users
    })
  }

}