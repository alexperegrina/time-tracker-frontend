import { Status } from "../enum/status";
import { format } from 'date-fns';

export class Tracking {
    constructor(
        public id: string,
        public start: Date,
        public end: Date | null
    ) { }

    get status(): Status {
        return this.end ? Status.Completed : Status.InProgress;
    }

    static fromPrimitive(data: { id: string; start: string; end: string | null }): Tracking {
        return new Tracking(data.id, new Date(data.start), data.end ? new Date(data.end) : null);
    }

    get formattedStart(): string {
        return format(this.start, 'dd/MM/yyyy HH:mm');
    }

    get formattedEnd(): string {
        return this.end ? format(this.end, 'dd/MM/yyyy HH:mm') : 'In Progress';
    }
}