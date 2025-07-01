<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 gap-10 flex flex-col justify-center items-center">
    <div class="flex justify-center items-center rounded-full w-full ">
      <img src="../../assets/images/logo.png" alt="logo" class="w-[200px] h-[200px] rounded-full">
    </div>
    <div class="max-w-[600px] w-full mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Formulário de Gravação
      </h1>

      <h2 class="text-lg font-bold text-gray-800 mb-6 text-center">
        Programa Fala Benção
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Campo Nome -->
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700 mb-2">
            Nome
          </label>
          <input
            id="nome"
            v-model="formData.nome"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite seu nome"
          />
        </div>

        <!-- Campo Cidade -->
        <div>
          <label for="cidade" class="block text-sm font-medium text-gray-700 mb-2">
            Cidade
          </label>
          <input
            id="cidade"
            v-model="formData.cidade"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite sua cidade"
          />
        </div>

        <!-- Campo Gravação de Áudio -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Gravação de Áudio (máximo 30 segundos)
          </label>
          
          <div class="space-y-3">
            <!-- Controles de Gravação -->
            <div class="flex space-x-3">
              <button
                type="button"
                @click="startRecording"
                :disabled="isRecording || !canRecord"
                class="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
              >
                {{ isRecording ? 'Gravando...' : 'Iniciar Gravação' }}
              </button>
              
              <button
                type="button"
                @click="stopRecording"
                :disabled="!isRecording"
                class="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white py-2 px-4 rounded-md transition-colors"
              >
                Parar
              </button>
            </div>

            <!-- Timer -->
            <div v-if="isRecording" class="text-center">
              <div class="text-lg font-semibold text-red-600">
                {{ formatTime(recordingTime) }}
              </div>
              <div class="text-sm text-gray-500">
                Tempo restante: {{ formatTime(30 - recordingTime) }}
              </div>
            </div>

            <!-- Áudio Gravado -->
            <div v-if="audioUrl" class="space-y-2">
              <div class="text-sm text-gray-600">Áudio gravado:</div>
              <audio controls class="w-full">
                <source :src="audioUrl" type="audio/wav">
                Seu navegador não suporta o elemento de áudio.
              </audio>
              <button
                type="button"
                @click="deleteRecording"
                class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors"
              >
                Deletar Gravação
              </button>
            </div>

            <!-- Mensagem de Erro -->
            <div v-if="errorMessage" class="text-red-600 text-sm">
              {{ errorMessage }}
            </div>
          </div>
        </div>

        <!-- Botão Enviar -->
        <button
          type="submit"
          :disabled="!formData.nome || !formData.cidade || !audioUrl"
          class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-md font-medium transition-colors"
        >
          Enviar Formulário
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onUnmounted } from 'vue';

export default {
  setup() {
    const formData = reactive({
      nome: '',
      cidade: ''
    });

    const isRecording = ref(false);
    const audioUrl = ref('');
    const errorMessage = ref('');
    const recordingTime = ref(0);
    const mediaRecorder = ref(null);
    const audioChunks = ref([]);
    const recordingTimer = ref(null);
    const canRecord = ref(true);

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.value = new MediaRecorder(stream);
        audioChunks.value = [];
        recordingTime.value = 0;
        errorMessage.value = '';

        mediaRecorder.value.ondataavailable = (event) => {
          audioChunks.value.push(event.data);
        };

        mediaRecorder.value.onstop = () => {
          const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
          audioUrl.value = URL.createObjectURL(audioBlob);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.value.start();
        isRecording.value = true;
        canRecord.value = false;

        // Timer para controle de 30 segundos
        recordingTimer.value = setInterval(() => {
          recordingTime.value++;
          if (recordingTime.value >= 30) {
            stopRecording();
          }
        }, 1000);

      } catch (error) {
        errorMessage.value = 'Erro ao acessar microfone. Verifique as permissões.';
        console.error('Erro ao iniciar gravação:', error);
      }
    };

    const stopRecording = () => {
      if (mediaRecorder.value && isRecording.value) {
        mediaRecorder.value.stop();
        isRecording.value = false;
        canRecord.value = true;
        
        if (recordingTimer.value) {
          clearInterval(recordingTimer.value);
          recordingTimer.value = null;
        }
      }
    };

    const deleteRecording = () => {
      if (audioUrl.value) {
        URL.revokeObjectURL(audioUrl.value);
        audioUrl.value = '';
      }
      audioChunks.value = [];
      recordingTime.value = 0;
      errorMessage.value = '';
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async () => {
      if (!formData.nome || !formData.cidade || !audioUrl.value) {
        errorMessage.value = 'Por favor, preencha todos os campos e grave um áudio.';
        return;
      }

      try {
        // Mostrar loading
        errorMessage.value = 'Enviando...';
        
        // Converter audioUrl para Blob
        const response = await fetch(audioUrl.value);
        const audioBlob = await response.blob();
        
        // Enviar para Discord Webhook
        await sendToDiscord(audioBlob, formData.nome, formData.cidade);
        
        // Sucesso
        alert('Formulário enviado com sucesso!');
        
        // Limpar formulário
        formData.nome = '';
        formData.cidade = '';
        deleteRecording();
        errorMessage.value = '';
        
      } catch (error) {
        console.error('Erro ao enviar:', error);
        errorMessage.value = 'Erro ao enviar. Tente novamente.';
      }
    };

    const sendToDiscord = async (audioBlob, nome, cidade) => {
      // Substitua pela URL do seu webhook do Discord
      const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1389744320797737040/KSZch0_e54Qij-fI51IVzFW-WdbPML3UlCEQd5DWNHX6O_Fb8gOPvpOnk4PebFY8Z84d';
      
      const formData = new FormData();
      formData.append('file', audioBlob, `${nome}_${cidade}_audio.wav`);
      formData.append('content', `🎤 **Nova Gravação Recebida!**\n\n👤 **Nome:** ${nome}\n🏙️ **Cidade:** ${cidade}\n⏰ **Data:** ${new Date().toLocaleString('pt-BR')}`);
      
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Falha ao enviar para Discord');
      }
    };

    // Limpeza ao desmontar o componente
    onUnmounted(() => {
      if (recordingTimer.value) {
        clearInterval(recordingTimer.value);
      }
      if (audioUrl.value) {
        URL.revokeObjectURL(audioUrl.value);
      }
    });

    return {
      formData,
      isRecording,
      audioUrl,
      errorMessage,
      recordingTime,
      canRecord,
      startRecording,
      stopRecording,
      deleteRecording,
      formatTime,
      handleSubmit
    };
  },
};
</script>
