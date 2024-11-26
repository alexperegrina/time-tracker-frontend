import { Status } from "../enum/status";
import { Tracking } from "./tracking";

export class Task {
    constructor(
        public id: string,
        public name: string,
        public time: { total: number; today: number },
        public tracking: Tracking[]
    ) { }

    static createFromResponse(data: {
        id: string;
        name: string;
        time: { total: number; today: number };
        tracking: Array<{ id: string; start: string; end: string | null }>;
    }): Task {
        const trackingObjects = data.tracking.map((track) => Tracking.fromPrimitive(track));
        return new Task(data.id, data.name, data.time, trackingObjects);
    }

    get hasInProgress(): boolean {
        return this.tracking.some((track) => track.status === Status.InProgress);
    }

    get status(): Status {
        return this.hasInProgress ? Status.InProgress : Status.Completed;
    }

    get elapsedTime(): number {
        const inProgressTracking = this.tracking.find((t) => t.status === Status.InProgress);
        if (inProgressTracking) {
            const startTime = inProgressTracking.start.getTime();
            const now = new Date().getTime();
            return Math.floor((now - startTime) / 1000);
        }
        return 0;
    }
}