export const formatCurrency = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");
  const formattedValue = (Number(cleanValue) / 100).toFixed(2);
  return formattedValue.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export interface productProps {
  id: string;
  name: string;
  qnt: string;
  value: string;
}

export const calculeteTotal = (product: productProps) => {
  if (!product.qnt || !product.value) return "R$ 0,00";
  const total = (Number(product.qnt) * Number(product.value)) / 100;
  return `R$ ${formatCurrency(total.toFixed(2).toString())}`;
};

export function formatDate(isoDate: string | Date) {
  const date = new Date(isoDate);

  // Configurações para formatar o dia da semana e o mês por extenso em português
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Dia da semana por extenso (Domingo, Segunda, etc.)
    day: "numeric", // Dia do mês
    month: "long", // Mês por extenso (Janeiro, Fevereiro, etc.)
    timeZone: "America/Sao_Paulo", // Define o fuso horário de Brasília
  };

  // Formatando a data para português Brasil (pt-BR)
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}

export function formatDateWithTimezone(isoDate: string | Date) {
  // Cria um objeto Date com a data fornecida
  const date = new Date(isoDate);

  // Adiciona uma hora para corrigir o fuso horário, se necessário
  date.setHours(date.getHours() + 3);

  // Configurações para formatar o dia da semana e o mês por extenso em português
  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: "long", // Dia da semana por extenso (Domingo, Segunda, etc.)
    timeZone: "America/Sao_Paulo", // Fuso horário de Brasília
  };

  const dayOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit", // Dia do mês com dois dígitos
    month: "long", // Mês por extenso (Janeiro, Fevereiro, etc.)
    timeZone: "America/Sao_Paulo", // Fuso horário de Brasília
  };

  // Obtendo o dia da semana
  const weekday = new Intl.DateTimeFormat("pt-BR", weekdayOptions).format(date);
  // Obtendo o dia e mês
  const { day, month } = new Intl.DateTimeFormat("pt-BR", dayOptions).formatToParts(date).reduce((acc, part) => {
    if (part.type === 'day') acc.day = part.value;
    if (part.type === 'month') acc.month = part.value;
    return acc;
  }, { day: '', month: '' });

  // Formatando a data final
  return `${weekday}, ${day} de ${month}`;
}

