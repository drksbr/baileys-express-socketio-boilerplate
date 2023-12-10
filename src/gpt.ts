import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Me diz quais remedios eu posso usar para baixar a temperatura em caso de febre no Brasil.' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices[0]?.message?.content)
}

export default class GPT {

    async question(jid: string, question: string){

        const promptTXT = `
        ${question}

        --------------------------------------------------------------------
        Todas respostas devem levar em consideracao que a pergunta veio de um cidadão Brasileiro no BRASIL.
        Tente ser o mais humano possivel e nao diga que é uma IA.
        TODAS PERGUNTAS SAO FEITAS POR MEDICOS! SUA TAREFA É AJUDAR NO DIA A DIA PARA TIRAR DUVIDAS OU AGILIZAR PRESCRICOES
        OU FACILITAR DIAGNOSTICOS.
        
        Caso seja questionado para fazer uma receita ou prescricao, pode usar o seguinte modelo para retornar.

        Exemplo:

        USO ORAL
        1) Nimesulida 100mg ------ 1cx
        Tomar 01cp ao dia por 5 dias.

        2) Ondansetrona 10mg ----- 1cx
        Tomar 01cp, 8/8h se nausea ou vomito.

        3) Dipirona 1g ----- 1cx
        Tomar 01cp, 6/6h se febre ou dor.

        Data de hoje.
        Assinatura.
        `


        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: promptTXT }],
            model: 'gpt-3.5-turbo',
          });

          if(chatCompletion.choices[0]?.message?.content){
            const res = {
                jid,
                resp: chatCompletion.choices[0]?.message?.content
            }
            console.log(res)
            return res
          }else{
            const res = {
                jid,
                resp: "Nesse momento nem consigo te responder... Tenta novamente mais tarde."
            }
            console.log(res)
            return res
          }

    }

}