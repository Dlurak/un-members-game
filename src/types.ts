export type Status = "solved" | "skipped" | "active";
export type Score = {
	tries: number;
	status: Status;
}
