import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { CatechistService, Core, ProfileService } from '../../../services/student.service';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.css'],
})
export class SelectDialogComponent implements OnInit {
  items: Core[] = [];
  selectedItems: Core[] = [];
  selectedIds: number[] = this.data?.selectedIds || [];
  title: string = '';
  type: string = this.data?.type || '';
  blockList: Core[] = [
    { id: 1, name: 'Khai tâm' },
    { id: 2, name: 'Rước lễ' },
    { id: 3, name: 'Thêm sức' },
    { id: 4, name: 'Sống đạo' },
  ];

  constructor(
    private catechistService: CatechistService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<SelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.type) {
      switch (this.type) {
        case 'CATECHIST':
          this.title = 'Chọn GLV';
          this.getCatechists();
          break;
        case 'PROFILE':
            this.title = 'Chọn quyền';
            this.getProfiles();
            break;
        default:
          break;
      }
    }
  }

  getCatechists(): void {
    this.catechistService.getCatechists().subscribe(
      (list) => {
        var data: Core[] = [];
        list.forEach(c => {
          var item: Core = {id: c.id, name: c.holyName + ' ' + c.firstName + ' ' + c.lastName};
          data.push(item);
          if(this.selectedIds.includes(c.id) && !this.selectedItems.includes(item)){
              this.selectedItems.push(item);
          }
        });
        this.items = data;
      },
      (error) => {
        console.error('Error fetching catechists:', error);
      }
    );
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      (list) => {
        var data: Core[] = [];
        list.forEach(c => {
          var item: Core = {id: c.id, name: c.name};
          data.push(item);
          if(this.selectedIds.includes(c.id) && !this.selectedItems.includes(item)){
            this.selectedItems.push(item);
          }
        });
        this.items = data;
      },
      (error) => {
        console.error('Error fetching profiles:', error);
      }
    );
  }

  onSelectionChange(event: MatSelectionListChange): void {
    const selectedId = event.options[0]?.value;
    var selectedItem = this.items.find(item => item.id === selectedId);
    if(!this.selectedIds.includes(selectedId))
    {
      this.selectedIds.push(selectedId);
      this.selectedItems.push(selectedItem!);
    }
    else {
      this.selectedIds = this.selectedIds.filter(item => item != selectedId);
      this.selectedItems = this.selectedItems.filter(item => item.id != selectedId);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.selectedItems);
  }
}
