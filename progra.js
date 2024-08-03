document.addEventListener("DOMContentLoaded", function() {
    const closeButton = document.querySelector('.close-button');
    const textArea = document.querySelector('.text-area');
    const encryptButton = document.querySelector('.encrypt-button');
    const decryptButton = document.querySelector('.decrypt-button');
    const rectangle = document.querySelector('.output-text-area');
    const copyButton = document.querySelector('.copy-button');
    const reloadButton = document.querySelector('.reload-button');
    const copyMessage = document.querySelector('.copy-message');

    closeButton.addEventListener('click', function() {
        textArea.value = ''; // Eliminar el texto del área de texto
        rectangle.value = ''; // Limpiar el área de salida
    });

    encryptButton.addEventListener('click', function() {
        const text = textArea.value;
        const encryptedText = encrypt(text); // Llama a la función de encriptación
        rectangle.value = encryptedText; // Coloca el texto encriptado en el rectángulo
    });

    decryptButton.addEventListener('click', function() {
        const text = textArea.value;
        const decryptedText = decrypt(text); // Llama a la función de desencriptación
        rectangle.value = decryptedText; // Coloca el texto desencriptado en el rectángulo
    });

    copyButton.addEventListener('click', function(event) {
        rectangle.select(); // Seleccionar el texto en el área de salida
        document.execCommand('copy'); // Copiar al portapapeles

        // Mostrar el mensaje de copiado cerca del puntero del mouse
        copyMessage.style.left = `${event.pageX}px`;
        copyMessage.style.top = `${event.pageY}px`;
        copyMessage.style.display = 'block'; 

        setTimeout(() => {
            copyMessage.style.display = 'none'; // Ocultar el mensaje después de 2 segundos
        }, 2000);
    });

    reloadButton.addEventListener('click', function() {
        const currentText = rectangle.value;
        const isEncrypted = currentText.includes('enter') || currentText.includes('imes') || currentText.includes('ai') || currentText.includes('ober') || currentText.includes('ufat');

        if (isEncrypted) {
            const decryptedText = decrypt(currentText); // Desencriptar
            rectangle.value = decryptedText; // Mostrar el texto desencriptado
        } else {
            const encryptedText = encrypt(currentText); // Encriptar
            rectangle.value = encryptedText; // Mostrar el texto encriptado
        }
    });

    function encrypt(text) {
        return text.replace(/e/g, "enter")
                   .replace(/i/g, "imes")
                   .replace(/a/g, "ai")
                   .replace(/o/g, "ober")
                   .replace(/u/g, "ufat");
    }

    function decrypt(text) {
        return text.replace(/enter/g, "e")
                   .replace(/imes/g, "i")
                   .replace(/ai/g, "a")
                   .replace(/ober/g, "o")
                   .replace(/ufat/g, "u");
    }

    textArea.addEventListener('input', function() {
        validateInput(textArea);
    });

    function validateInput(textArea) {
        const inputInfo = document.getElementById('input-info');
        const inputText = textArea.value;

        // Verificar si hay letras mayúsculas o acentos
        const hasUpperCase = /[A-Z]/.test(inputText);
        const hasAccents = /[áéíóúñ]/.test(inputText);

        // Mostrar el mensaje si hay mayúsculas o acentos, de lo contrario, ocultarlo
        if (hasUpperCase || hasAccents) {
            inputInfo.style.display = 'block'; // Mostrar el mensaje
        } else {
            inputInfo.style.display = 'none'; // Ocultar el mensaje
        }

        // Permitir solo letras minúsculas sin acentos
        textArea.value = inputText.replace(/[^a-z0-9\s.,!?;:()\-]/g, ''); // Permitir letras minúsculas, números y otros símbolos
    }
});
