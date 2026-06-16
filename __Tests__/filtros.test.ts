describe("CP-07 - Filtrado de Catálogo", () => {
  const productos = [
    {
      id: 1,
      categoria: "Mascarillas",
      precio: 5000,
    },
    {
      id: 2,
      categoria: "Guantes",
      precio: 15000,
    },
    {
      id: 3,
      categoria: "Mascarillas",
      precio: 8000,
    },
  ];

  it("debe filtrar por categoría", () => {
    const resultado = productos.filter(
      (p) => p.categoria === "Mascarillas"
    );

    expect(resultado.length).toBe(2);
  });

  it("debe filtrar por precio", () => {
    const resultado = productos.filter(
      (p) => p.precio <= 10000
    );

    expect(resultado.length).toBe(2);
  });
});