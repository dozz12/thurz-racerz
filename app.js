// Mengatur scene, kamera, dan renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Membuat mobil 3D (mobil sederhana)
const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const carMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);

// Membuat track 3D (contoh trek sederhana)
const trackGeometry = new THREE.PlaneGeometry(100, 100);
const trackMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const track = new THREE.Mesh(trackGeometry, trackMaterial);
track.rotation.x = -Math.PI / 2;
track.position.y = -0.5;
scene.add(track);

// Menempatkan kamera di belakang mobil
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(car.position);

// Variabel untuk kontrol
let carSpeed = 0;
let carLane = 0; // Mengontrol posisi mobil di sepanjang sumbu X (jalur mobil)

// Fungsi untuk menggerakkan mobil
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        carSpeed = 0.1;  // Gerakkan mobil maju
    } else if (event.key === "ArrowDown") {
        carSpeed = -0.1; // Gerakkan mobil mundur
    } else if (event.key === "ArrowLeft") {
        carLane -= 0.1;  // Pindah ke kiri
    } else if (event.key === "ArrowRight") {
        carLane += 0.1;  // Pindah ke kanan
    }
});

document.addEventListener("keyup", () => {
    carSpeed = 0;  // Menghentikan pergerakan mobil
});

// Fungsi untuk memulai game
function startGame() {
    document.getElementById("menu").style.display = "none";  // Menyembunyikan menu
    animate();  // Mulai animasi game
}

// Animasi dan render loop
function animate() {
    requestAnimationFrame(animate);

    // Gerakkan mobil maju/mundur
    car.position.z += carSpeed;

    // Pindahkan mobil ke kiri/kanan
    car.position.x = carLane;

    // Render scene
    renderer.render(scene, camera);
}

// Menyesuaikan ukuran canvas saat ukuran jendela berubah
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Menyembunyikan menu saat game dimulai
document.getElementById("menu").style.display = "block";
