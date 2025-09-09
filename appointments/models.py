from django.db import models

# Create your models here.

class UserDetail(models.Model):
    name = models.CharField(max_length=30)
    national_id = models.PositiveBigIntegerField(null=True, blank=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.CharField(max_length=80)
    appointment_type = models.CharField(max_length=30)
    booking_reason = models.TextField(max_length=200)

    def __str__(self):
        return f"{self.name} ({self.phone_number})"


class DoctorDetail(models.Model):
    name = models.CharField(max_length=60, blank=True, null=True)
    speciality = models.CharField(max_length=30, blank=True, null=True)
    branch_name = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.name if self.name else "Unnamed Doctor"


class AppointmentDetail(models.Model):
    user = models.ForeignKey(UserDetail, on_delete=models.CASCADE, related_name="appointments")
    doctor = models.ForeignKey(DoctorDetail, on_delete=models.SET_NULL, null=True, blank=True, related_name="appointments")
    appointment_date_and_time = models.DateTimeField()

    def __str__(self):
        return f"Appointment for {self.user.name} on {self.appointment_date_and_time}"


class PaymentDetail(models.Model):
    appointment = models.OneToOneField(AppointmentDetail, on_delete=models.CASCADE, related_name="payment")
    pre_paid = models.BooleanField()  # True: paid online, False: pay at hospital

    def __str__(self):
        return f"Payment for {self.appointment.user.name}: {'Online' if self.pre_paid else 'At Hospital'}"