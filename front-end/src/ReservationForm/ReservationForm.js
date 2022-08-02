import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationForm({
    reservation,
    setReservation,
    submitFunction
}) {
    const history = useHistory();

	const cancelHandler = (event) => {
		history.goBack();
	};

	const changeHandler = (event) => {
		const resKey = event.target.name;
		let resValue = event.target.value;
		if (resKey === "people" && resValue) {
			resValue = parseInt(resValue);
		}
		setReservation({ ...reservation, [resKey]: resValue });
	};

    let formData = reservation;

    return (
        <div>
            <form onSubmit={submitFunction}>
                    <div className="row">
                    <div className="form-group col">
                        <label>First Name
                        <input name="first_name" type="text" className="form-control" required="" placeholder="First Name" value={formData.first_name} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>Last Name
                        <input name="last_name" type="text" className="form-control" required="" placeholder="Last Name" value={formData.last_name} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>Mobile Number
                        <input name="mobile_number" type="text" className="form-control" required="" placeholder="Mobile Number" value={formData.mobile_number} onChange={changeHandler}></input>
                        </label>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-group col">
                        <label>Date
                        <input name="reservation_date" type="date" className="form-control" required="" placeholder="yyyy-mm-dd" value={formData.reservation_date} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>Time
                        <input name="reservation_time" type="time" className="form-control" required="" placeholder="--:-- --" value={formData.reservation_time} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>People
                        <input name="people" type="number" className="form-control" required="" value={formData.people} onChange={changeHandler}></input>
                        </label>
                    </div>
                    </div>
                    <button className="btn btn-secondary mr-2 cancel" type="button" onClick={cancelHandler}>Cancel</button>
                    <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}