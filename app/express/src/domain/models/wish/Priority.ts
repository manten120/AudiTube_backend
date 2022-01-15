import type { PriorityValue } from '../../../types';

export class Priority {
  readonly value: PriorityValue;

  constructor(value: PriorityValue = 0) {
    if (![0, 1, 2, 3].includes(value)) {
      throw new Error('Priorityの値はnumber型の0,1,2,3です');
    }
    this.value = value;
  }
}
