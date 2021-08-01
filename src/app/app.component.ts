 import { Component, OnInit } from '@angular/core'; 
import { environment } from '../environments/environment';
import { ApiService} from '../app/helpers/services/do-api-service'
import { timeInterval, timeout } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
 
export class AppComponent {
  public lstDteSubmission;
  public cityUrl;
  public destinationUrl;
  public cityData;
  public destinationData;
  public errorMessage;
  public validated = false;
  public Name;
  public ContactNo;
  public Email;
  constructor(private api:ApiService) { 
    this.lstDteSubmission = new Date("Aug 8, 2021 18:00:00").getTime();
    this.cityUrl = environment.cityApiUrl;
    this.destinationUrl = environment.destinationApiUrl;
    this.Name = "";
    this.ContactNo ="";
    this.Email = "";
  }
  ngOnInit(): void {
     this.startTimer(this.lstDteSubmission);
     this.getCities();
     this.getDestinations();
  }
  SubmitForm(){
    this.validated = false;
    if(this.Name != "" && this.ContactNo != "" && this.Email != ""){
      this.validated = true;
    }
  }
  getCities(){
    this.errorMessage = "";
    this.api.get(this.cityUrl)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
          this.cityData = response.result; 
        },
        (error) => {                              //error() callback
          console.error('Request failed with error');
          this.errorMessage = error;
        },
        () => {                                   //complete() callback
          console.log('Request completed');     //This is actually not needed          
        })
  }
  getDestinations(){
    this.errorMessage = "";
    this.api.get(this.destinationUrl)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
          this.destinationData = response.result; 
        },
        (error) => {                              //error() callback
          console.error('Request failed with error');
          this.errorMessage = error;
        },
        () => {                                   //complete() callback
          console.log('Request completed');      //This is actually not needed          
        })
  }
  startTimer(lastDateofSubmission) {
    var time = setInterval(function() {
      var now = new Date().getTime();
      var distance = lastDateofSubmission - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("countDownTime").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(time);
        document.getElementById("countDownTime").innerHTML = "EXPIRED";
      }
    },1000);    
  }
}
