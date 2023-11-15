// Función para generar números aleatorios en un rango de 1 a 20
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 20) + 1;
  }
  
  // Generar 10,000 números aleatorios y contar su frecuencia
  const numerosGenerados = [];
  const frecuenciaNumeros = {};
  
  for (let i = 0; i < 10000; i++) {
    const numero = generarNumeroAleatorio();
    numerosGenerados.push(numero);
  
    if (frecuenciaNumeros[numero]) {
      frecuenciaNumeros[numero]++;
    } else {
      frecuenciaNumeros[numero] = 1;
    }
  }
  
  // Imprimir resultados en la consola
  console.log('Números generados:', numerosGenerados);
  console.log('Frecuencia de cada número:');
  console.log(frecuenciaNumeros);
  