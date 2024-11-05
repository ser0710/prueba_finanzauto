FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV DH_HOST=db
ENV DB_PORT=5433
ENV DB_NAME=finanzauto
ENV DB_USER=ser0710
ENV DB_PASSWORD=Prueba_fin

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]