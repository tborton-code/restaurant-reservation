import React, { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import ReservationForm from "../ReservationForm/ReservationForm";

export default function EditReservation() {
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [formData, setFormData] = useState({...initialFormState});
    const [error, setError] = useState(null);
    const { reservation_id } = useParams();

    useEffect(() => {
        const ac = new AbortController();
        readReservation(reservation_id, ac.signal)
        .then((response) => {
            setFormData({
                ...response 
            })
        })
        .catch(setError);
    }, [reservation_id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const ac = new AbortController();
            setError(null);
            await updateReservation({
                ...formData, people: Number(formData.people )
            }, ac.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
            return () => ac.abort();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Edit Reservation</h1>
            <ErrorAlert error={error} />
            <ReservationForm 
                reservation={formData}
                setReservation={setFormData}
                submitFunction={handleSubmit}
            />
        </div>
    )
}