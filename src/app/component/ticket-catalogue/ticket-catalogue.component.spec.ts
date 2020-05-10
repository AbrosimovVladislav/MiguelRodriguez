import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCatalogueComponent } from './ticket-catalogue.component';

describe('TicketCatalogueComponent', () => {
  let component: TicketCatalogueComponent;
  let fixture: ComponentFixture<TicketCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
