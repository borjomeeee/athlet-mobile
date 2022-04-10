import {Id} from './Id';

class LinkedListItem {
  id: string;
  item: any;

  prev: string | undefined;

  constructor(item: any, prev: string | undefined) {
    this.id = Id.generate();
    this.item = item;

    this.prev = prev;
  }
}

export class LinkedList {
  #last: string | undefined;
  #chain: Record<string, LinkedListItem>;

  constructor() {
    this.#chain = {};
  }

  push = (item: any) => {
    const newItem = new LinkedListItem(item, this.#last);
    this.#chain[newItem.id] = newItem;

    return this;
  };

  pop = () => {
    if (!this.#last) {
      return this;
    }

    const toDelete = this.#last;
    this.#last = this.#chain[toDelete].prev;
    delete this.#chain[toDelete];

    return this;
  };

  getLast = () => {
    if (this.#last) {
      return this.#chain[this.#last];
    }
  };
}
