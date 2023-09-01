export default class MessageDto {
	public id: string;
	public data: any[];

	constructor(
		id: string,
		data: any[]
	) {
		this.id = id;
		this.data = data;
	}

	public toModel(): {event_id: string, data: string} {
		return {
			event_id: this.id,
			data: JSON.stringify(this.data),
		};
	}
}