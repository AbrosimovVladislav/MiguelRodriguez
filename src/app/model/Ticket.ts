import {ScrapperOffer} from './ScrapperOffer';

export interface Ticket {
  id;
  scrapperOffer: ScrapperOffer;
  productIds;
  createdTime;
  status;
}
