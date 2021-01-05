import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { Comment } from './comment.Model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }
comment: Comment = new Comment();
formData: Ticket = new Ticket();
list :Ticket[];
commentList: Comment[];
data:any = localStorage.getItem("key");
user = JSON.parse(this.data);
userId = this.user.userId;
readonly baseUrl1='http://localhost:55985/api/Tickets';
readonly baseUrl2='http://localhost:55985/api/Users';
readonly baseUrl3='http://localhost:55985/api/Comments';

postTicket()
{
  return this.http.post(this.baseUrl1,this.formData);
}

putTicket()
{
  return this.http.put(`${this.baseUrl1}/${this.formData.ticketId}`,this.formData);
}

deleteTicket(Id:number)
{
  return this.http.delete(`${this.baseUrl1}/${Id}`);
}

refreshList()
{
  this.http.get(`${this.baseUrl2}/${this.userId}`)
  .toPromise()
  .then(res=> this.list= res as Ticket[]);

}

refreshCommentList()
{
   this.http.get(`${this.baseUrl3}/${this.formData.ticketId}`)
   .toPromise()
   .then(res=> this.commentList = res as Comment[]);
}

getTicketDetail(Id:number)
{
  return this.http.get(`${this.baseUrl1}/${Id}`);
}

postComment()
{
   return this.http.post(this.baseUrl3,this.comment)
}

}
