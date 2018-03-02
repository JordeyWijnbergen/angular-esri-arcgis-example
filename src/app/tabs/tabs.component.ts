import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Input() horizontal = true;
  constructor() {
    console.log('constructor tabs');
  }
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    // tslint:disable-next-line:prefer-const
    console.log('after tabs init');
    const activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tb => tb.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }

}
