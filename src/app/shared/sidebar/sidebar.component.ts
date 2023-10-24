import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ngOnInit() {
    this.initSidebar();
  }

  initSidebar() {
    const showSidebar = (toggleId: string, sidebarId: string, bodyId: string, contentId: string) => {
      const toggle = document.getElementById(toggleId);
      const sidebar = document.getElementById(sidebarId);
      const bodypd = document.getElementById(bodyId);
      const content = document.getElementById(contentId);

      // Validate that all variables exist
      if (toggle && sidebar && bodypd && content) {
        toggle.addEventListener('click', () => {
          // show sidebar
          sidebar.classList.toggle('show');
          // change icon
          toggle.classList.toggle('bx-x');
          // add padding to body
          bodypd.classList.toggle('body-pd');
          // shift content to the right
          content.classList.toggle('body-pd');
        });
      }
    };

    showSidebar('sidebar-toggle', 'sidebar', 'body-pd', 'content');

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.sidebar_link');

    function colorLink(this: HTMLElement) {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove('active'));
        this.classList.add('active');
      }
    }
    linkColor.forEach((l) => l.addEventListener('click', colorLink));
  }
}
