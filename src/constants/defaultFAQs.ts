interface IFAQs {
  question: string;
  answer: string;
}

export const faqs: IFAQs[] = [
  {
    question: "¿Qué puedo gestionar en MediStock?",
    answer:
      "MediStock permite gestionar medicamentos, controlar el inventario en tiempo real, registrar entradas y salidas de stock, y administrar el catálogo de productos farmacéuticos.",
  },
  {
    question: "¿Cómo se actualiza el stock de los medicamentos?",
    answer:
      "El stock se actualiza automáticamente cada vez que se registra una venta, recepción de productos o ajuste de inventario, asegurando información en tiempo real.",
  },
  {
    question: "¿Puedo integrar MediStock con otros sistemas?",
    answer:
      "Sí. MediStock expone una API REST que permite la integración con sistemas ERP de clínicas y farmacias para consultar productos, precios y stock de forma automatizada.",
  },
  {
    question: "¿Qué tipo de productos se pueden registrar?",
    answer:
      "Se pueden registrar medicamentos, insumos médicos, productos de laboratorio y otros artículos relacionados con el área de salud.",
  },
  {
    question: "¿Cómo funciona el control de vencimiento?",
    answer:
      "El sistema permite registrar fechas de vencimiento y generar alertas automáticas cuando los medicamentos están próximos a expirar.",
  },
  {
    question: "¿Se puede acceder desde diferentes dispositivos?",
    answer:
      "Sí, MediStock es un sistema web responsive que puede utilizarse desde computadores, tablets y dispositivos móviles.",
  },
];