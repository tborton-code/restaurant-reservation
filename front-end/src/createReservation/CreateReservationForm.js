import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../ReservationForm/ReservationForm";

export default function CreateReservation() {
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
        status: "booked",
    }

    const [formData, setFormData] = useState({...initialFormState});
    const [reservationsErrors, setReservationsErrors] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setReservationsErrors(null);
            const response = await createReservations({...formData, people: Number(formData.people)});
            const date = response.reservation_date;
            history.push(`/dashboard?date=${date}`)
        } catch (error) {
            setReservationsErrors(error);
            console.log(error);
        };
    }

   

    return (
        <div>
            <h1>Create Reservation</h1>
            <ErrorAlert error={reservationsErrors} />
            <ReservationForm 
                reservation={formData}
                setReservation={setFormData}
                submitFunction={handleSubmit}
            />
        </div>
    )
}