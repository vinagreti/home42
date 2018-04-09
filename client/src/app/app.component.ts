import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  files: any;

  title = 'app';

  videoUrl: string;

  constructor(private http: HttpClient) {

  }

  reload() {

    this.http.get('http://localhost:420/user/123')
    .subscribe((res: any) => {

      this.files = res.filter(file => file.name.search('mp4') >= 0).map(file => {
        return {
          name: file.name,
          data: this.getDataFromFilename(file.name),
          path: file.path
        };
      });
    });

  }

  private getDataFromFilename(fileName) {

    const fileNameArray = fileName.split(/[\-,_]+/);

    const timestamp = fileNameArray[0] + '000';

    const local = fileNameArray[3];

    return {
      timestamp,
      local
    };

  }

  open(file) {

    this.videoUrl = undefined;

    setTimeout(() => {

      this.videoUrl = `http://localhost:420/${file.name}`;

    }, 100);

  }

}
