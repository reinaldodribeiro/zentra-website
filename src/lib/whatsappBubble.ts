export type EstadoBalao = {
  vencido: boolean;
  dispensado: boolean;
  bloqueado: boolean;
  contatoNaTela: boolean;
};

export function balaoVisivel(estado: EstadoBalao): boolean {
  return estado.vencido && !estado.dispensado && !estado.bloqueado && !estado.contatoNaTela;
}

export function restanteMs(restante: number, decorrido: number): number {
  return Math.max(0, restante - Math.max(0, decorrido));
}
