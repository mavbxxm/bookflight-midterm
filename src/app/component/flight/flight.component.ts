import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Flight } from './flight';
import { PageService } from 'src/app/share/page.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  bookForm !: FormGroup;
  flights !: Flight[];
  sDate: Date;
  StartDate: Date;
  cFrom:string [] = ['Italy','Norway','Finland','Poland','Russia ','Spain','Sweden'];
  cTo:string [] = ['Italy','Norway','Finland','Poland','Russia ','Spain','Sweden'];




  constructor(private fb: FormBuilder, public pageService: PageService) {
    this.sDate = new Date(Date.now())
    this.StartDate = new Date(this.sDate.toLocaleDateString('th-TH'))

    this.bookForm = this.fb.group({
      fullName: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      type: ['', Validators.required],
      departure: [, Validators.required],
      arrival: [],
      adults: [, [Validators.required, Validators.max(99), Validators.pattern("[0-9]*$")]],
      children: [,[Validators.max(99), Validators.pattern("[0-9]*$")]],
      infants: [, [Validators.max(99),Validators.pattern("[0-9]*$")]]
    });

  }

  ngOnInit(): void {
    this.getPages();
  }

  getPages(){
    this.flights = this.pageService.getPages();
  }
  // sub() {
  //   var txt;
  //   const date = console.log(new Date())
  //   this.coffeeForm.value.Date = new Date()

  //   if (confirm("ยืนยันออเดอร์")) {
  //     this.confirmstate=true;
  //   }

  onSubmit(f:Flight): void{
    let a  = new Date(f.departure).toISOString().slice(0, -1)
    let b = new Date(f.arrival).toISOString().slice(0, -1)
    f.departure = new Date(a)
    f.arrival = new Date(b)

    if(f.from == f.to){
      alert("Please choose another Country")
    }else{

      if(f.type == "One way"){
        f.arrival = new Date("")
      }

      if(f.children == null){
        f.children = 0
      }

      if(f.infants == null){
        f.infants = 0
      }

      this.pageService.addFlight(f)
      alert("booked")
      this.bookForm.reset()

    }
  }


}
