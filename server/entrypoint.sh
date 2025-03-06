#!/bin/sh

wait_for_db() {
    echo "Menunggu database siap..."
    retries=10
    delay=5
    for attempt in $(seq 1 $retries); do
        nc -z db 5432 && echo "Database siap!" && return 0
        echo "Percobaan $attempt/$retries gagal. Menunggu $delay detik..."
        sleep $delay
    done
    echo "Database tidak dapat dijangkau setelah beberapa percobaan."
    exit 1
}

wait_for_db

echo "Menerapkan migrasi..."
flask db upgrade

echo "Memulai server Flask..."
exec flask run --host=0.0.0.0