import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Ticket } from 'src/app/shared/ticket.model';
import { TicketService } from 'src/app/shared/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styles: [
  ]
})
export class TicketDetailComponent implements OnInit {

  form:NgForm;
  Id: any;
  ticket:any;
  constructor(private actRoute: ActivatedRoute,
              private route:RouterModule,
              public service:TicketService) { }

  ngOnInit(): void {
    this.service.refreshCommentList();
    this.Id=this.actRoute.snapshot.paramMap.get("id");

    this.loadTicketDetails(this.Id);

  }

  loadTicketDetails(Id:any)
  {
    this.service.getTicketDetail(Id).subscribe(tckt=>{
      this.ticket=tckt;
      this.service.formData.ticketId=this.ticket.ticketId;

    });
  }

  formSubmit(form:NgForm)
  {
      this.service.comment.ticketId=this.ticket.ticketId;
      this.service.postComment().subscribe(res=>
        {
          this.service.refreshCommentList();
        },
        err=>{
          console.log('comment not added')
        });
      this.resetForm(form);

  }

  resetForm(form:NgForm)
  {
    form.reset();
    this.service.refreshCommentList();
  }

}
