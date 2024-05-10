import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-homepage-faq',
  standalone: true,
  imports: [],
  templateUrl: './homepage-faq.component.html',
  styleUrl: './homepage-faq.component.css'
})
export class HomepageFaqComponent implements OnInit{
  ngOnInit():void {
    initFlowbite()};
}

