import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  loading = true;
  smallerThanWrapper = false;
  wrapperWidth: number;
  wrapperHeight: number;
  imageWidth: number;
  imageHeight: number;

  @ViewChild("picture")
  picture: ElementRef;

  @Input()
  title: string;

  @Input()
  url: string;

  @Input()
  author: string;

  @Input()
  id: string;

  constructor() { }

  ngOnInit() {
    this.wrapperWidth = this.picture.nativeElement.parentNode.offsetWidth;
    this.wrapperHeight = this.picture.nativeElement.parentNode.offsetHeight;
  }

  public ImageLoaded()
  {
    this.imageWidth = this.picture.nativeElement.width;
    this.imageHeight = this.picture.nativeElement.height;
    this.CenterImage();
    this.loading = false;
  }

  public CenterImage()
  {
    if(this.imageWidth > this.wrapperWidth)
    {
      this.smallerThanWrapper = false;
      this.picture.nativeElement.style.left = "-" + (this.picture.nativeElement.width - this.wrapperWidth)/2 + "px";
    }
    else
    {
      this.smallerThanWrapper = true;
    }

    if(this.picture.nativeElement.height > this.wrapperHeight)
    {
      this.picture.nativeElement.style.top = "-" + (this.picture.nativeElement.height - this.wrapperHeight)/2 + "px";
    }
  }

  public OnResize()
  {
    this.wrapperWidth = this.picture.nativeElement.parentNode.offsetWidth;
    this.wrapperHeight = this.picture.nativeElement.parentNode.offsetHeight;
    this.CenterImage();
  }

}
