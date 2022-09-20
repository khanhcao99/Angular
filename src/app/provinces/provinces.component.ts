import {Component, OnInit} from '@angular/core';
import {Province} from "../model/province";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProvinceService} from "../service/province.service";
import {Country} from "../model/country";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.css']
})
export class ProvincesComponent implements OnInit {
  provinces: Province[] = []
  countries: Country[] = []
  idp?: number
  country?: number
  provinceForm!: FormGroup;

  constructor(private provinceService: ProvinceService,
              private formGroup: FormBuilder) {

  }

  ngOnInit(): void {
    this.displayProvinces()
    this.provinceForm = this.formGroup.group({
      id: [''],
      name: [''],
      area: [''],
      population: [''],
      gdp: [''],
      description: [''],
      country: [''],
    })
  }

  displayProvinces() {
    this.provinceService.findAllProvinces().subscribe(value => {
      this.provinces = value
    })
    this.provinceService.findAllCountries().subscribe(value => {
      this.countries = value
    })
  }

  displayFormCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "block";
    // @ts-ignore
    this.setUpFormCreate()

  }

  setUpFormCreate() {
    // @ts-ignore
    document.getElementById("name").value = ""
    // @ts-ignore
    document.getElementById("area").value = ""
    // @ts-ignore
    document.getElementById("population").value = ""
    // @ts-ignore
    document.getElementById("gdp").value = ""
    // @ts-ignore
    document.getElementById("description").value = ""
    // @ts-ignore
    document.getElementById("titleFrom").innerHTML = "Tạo mới thành phố";
    // @ts-ignore
    document.getElementById("buttonCreate")!.hidden = false
    // @ts-ignore
    document.getElementById("buttonUpdate")!.hidden = true
    this.provinceService.findAllCountries().subscribe(value => {
      this.countries = value
    })


  }

  setUpFormUpdate(province: Province) {
    this.provinceForm.patchValue(province)
    // @ts-ignore
    document.getElementById("titleFrom").innerHTML = "Chỉnh sửa thành phố";
    // @ts-ignore
    document.getElementById("countries").value = province.country?.id
    // @ts-ignore
    document.getElementById("buttonCreate")!.hidden = true
    // @ts-ignore
    document.getElementById("buttonUpdate")!.hidden = false
    // @ts-ignore
    document.getElementById("myModal").style.display = "block"
  }

  closeFromCreate() {
    let modal = document.getElementById("myModal");
    // @ts-ignore
    modal.style.display = "none";
  }

  createProvince() {
    // @ts-ignore
    this.country = document.getElementById("countries").value
    let province = {
      id: this.provinceForm.value.id,
      name: this.provinceForm.value.name,
      area: this.provinceForm.value.area,
      population: this.provinceForm.value.population,
      gdp: this.provinceForm.value.gdp,
      description: this.provinceForm.value.description,
      country: {
        id: this.country
      }
    }
    this.provinceService.createProvince(province).subscribe(value => {
      this.createSuccess()
      // @ts-ignore
      document.getElementById("myModal").style.display = "none"
      this.displayProvinces()
      console.log(value)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tạo mới thất bại',
        showConfirmButton: false,
        timer: 1500
      })
    })
    // @ts-ignore
    document.getElementById("rest").click()
  }

  createSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tạo mới thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }

  updateForm(id?: number) {
    this.idp = id;
    this.provinceService.getProvinceById(this.idp).subscribe(value => {
      this.setUpFormUpdate(value)
    })
  }

  updateProvince(){
    // @ts-ignore
    this.country = document.getElementById("countries").value
    let province = {
      id: this.idp,
      name: this.provinceForm.value.name,
      area: this.provinceForm.value.area,
      population: this.provinceForm.value.population,
      gdp: this.provinceForm.value.gdp,
      description: this.provinceForm.value.description,
      country: {
        id: this.country
      }
    }

    Swal.fire({
      title: 'Bản có chắc chắn muốn chỉnh sửa?',
      showDenyButton: true,
      confirmButtonText: 'Chỉnh sửa',
      denyButtonText: `Hủy`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.provinceService.updateProvince(province).subscribe(value => {
          this.setUpFormUpdate(value)
          // @ts-ignore
          document.getElementById("myModal").style.display = "none"
          this.displayProvinces()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Chỉnh sửa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire('Chỉnh sửa thành công!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Hủy bỏ!', '', 'info')
      }
    })

  }

  deleteProvince(id?: number){
    this.idp = id
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Dữ liệu sẽ không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.provinceService.deleteProvince(id).subscribe(value => {
          this.displayProvinces()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Xóa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire(
          'Xóa thành công!',
          'Dữ liệu đã bị xóa bỏ',
          'success'
        )
      }
    })
  }

}
