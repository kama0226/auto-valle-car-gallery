import { describe, expect, it } from 'vitest';
import { CARS, CATEGORY_OPTIONS, getVehicle, relatedVehicles, vehicleSpec } from './vehicles';
import { whatsappLink } from './socials';

describe('Vehicle information rules', () => {
  const sienna = getVehicle('toyota-sienna-2017');
  it('replaces the F-150 with the owner Sienna 2017 SE in vans', () => {
    expect(getVehicle('ford-f-150')).toBeUndefined();
    expect(sienna).toMatchObject({ name: 'Toyota Sienna', brand: 'Toyota', year: 2017, model: 'Sienna SE (Sport Edition)', cat: 'van' });
    expect(sienna?.img).toContain('/toyota-sienna-2017.png');
  });
  it.each([['Kilometraje', '87.000 km'], ['Cilindros', '6'], ['Transmisión', 'Automática'], ['Combustible', 'Gasolina'], ['Color exterior', 'Blanco'], ['Color interior', 'Negro'], ['Estado general', 'Excelentes condiciones'], ['Precio', 'Consultar información'], ['Motor', 'Consultar información'], ['Disponibilidad', 'Consultar información']])('records supplied Sienna %s without inheriting Ford data', (field, value) => {
    expect(sienna && vehicleSpec(sienna, field)).toBe(value);
  });
  it('preserves Sienna equipment and seller documentation', () => {
    expect(sienna?.equipment).toEqual(['Modo Eco', 'Faros LED', 'Pantalla', 'Cámara de reversa', 'Apple CarPlay', 'Android Auto', 'Puertas eléctricas', 'Aire de triple zona', 'Rines de lujo de 19 pulgadas', 'Interiores de piel color negro']);
    expect(sienna?.sellerNotes).toEqual(['A toda prueba', 'Muy limpia por dentro', 'Legalizada por pedimento (Aduana)', 'Sale facturada a nombre del comprador']);
  });
  const corolla = getVehicle('toyota-corolla-2017');
  it('replaces Corvette with the supplied 2017 Corolla Sport sedan', () => {
    expect(getVehicle('chevrolet-corvette-stingray')).toBeUndefined();
    expect(corolla).toMatchObject({ name: 'Toyota Corolla', brand: 'Toyota', model: 'Corolla Sport', year: 2017, cat: 'sedan' });
    expect(corolla?.img).toContain('/toyota-corolla-2017.png');
  });
  it('uses the seller description price without copying the conflicting header price', () => {
    expect(corolla && vehicleSpec(corolla, 'Precio')).toBe('$208,000 MXN');
    expect(corolla?.sellerNotes).not.toContain('Precio poco negociable');
  });
  it.each([['Kilometraje', '82.000 km'], ['Cilindros', '4'], ['Transmisión', 'Automática'], ['Combustible', 'Gasolina'], ['Color exterior', 'Rojo'], ['Color interior', 'Negro'], ['Ubicación', 'Culiacán Rosales, Sinaloa'], ['Motor', 'Consultar información'], ['Disponibilidad', 'Consultar información']])('records Corolla %s without inventing data', (field, value) => {
    expect(corolla && vehicleSpec(corolla, field)).toBe(value);
  });
  it('preserves Corolla equipment and seller conditions', () => {
    expect(corolla?.equipment).toEqual(['Rines de lujo de 17 pulgadas', 'Pantalla', 'Cámara de reversa', 'Sensor frontal de alcance', 'Faros LED', 'Faros de niebla LED']);
    expect(corolla?.sellerNotes).toEqual(['Legalizado por pedimento (Aduana)', 'Sale facturado a nombre del comprador', 'No paga cambio de propietario', 'Puede emplacar en cualquier estado de México', 'No cambios, solo venta']);
  });
  const jetta = getVehicle('volkswagen-jetta-2018');
  it('replaces the Mustang with the available 2018 Jetta in sedan', () => {
    expect(getVehicle('ford-mustang-gt')).toBeUndefined();
    expect(jetta).toMatchObject({ name: 'Volkswagen Jetta', year: 2018, cat: 'sedan', model: 'Jetta TSI SEL' });
    expect(jetta && vehicleSpec(jetta, 'Disponibilidad')).toBe('Disponible');
  });
  it('uses the supplied price in Mexican pesos rather than illustrative dollars', () => {
    expect(jetta && vehicleSpec(jetta, 'Precio')).toBe('$178,000 MXN');
    expect(jetta?.sellerNotes).toContain('Precio poco negociable');
    expect(jetta?.sellerNotes).toContain('No cambios');
  });
  it.each([
    ['Kilometraje', '72.000 km'], ['Motor', '1.8 TSI (Turbo)'], ['Cilindros', '4'],
    ['Transmisión', 'Automática'], ['Combustible', 'Gasolina'], ['Color exterior', 'Azul'], ['Color interior', 'Negro'],
  ])('records the supplied %s', (field, value) => { expect(jetta && vehicleSpec(jetta, field)).toBe(value); });
  it('uses the owner photo and supplied equipment and documentation', () => {
    expect(jetta?.img).toContain('/volkswagen-jetta-2018.png');
    expect(jetta?.equipment).toEqual(['Quemacocos', 'Interiores de piel eléctricos', 'Aire de doble zona', 'Rines de lujo de 17 pulgadas', 'Llave de presencia', 'Encendido de botón', 'Sensores de rebase', 'Sensores de radar frontal', 'Cámara de reversa', 'Sistema de navegación de agencia', 'Apple CarPlay', 'Android Auto']);
    expect(jetta?.sellerNotes).toEqual(['Legalizado por pedimento (Aduana)', 'Puede emplacar en cualquier estado de México', 'Garantía total en documentos', 'Precio poco negociable', 'No cambios']);
  });
  const rogue = getVehicle('nissan-rogue-2018');
  it('replaces the Bel Air with the owner Nissan Rogue 2018 in SUV', () => {
    expect(getVehicle('chevrolet-bel-air')).toBeUndefined();
    expect(rogue).toMatchObject({ name: 'Nissan Rogue', brand: 'Nissan', year: 2018, model: 'Rogue (X-Trail) SV AWD', cat: 'suv' });
    expect(rogue?.img).toContain('/nissan-rogue-2018.png');
  });
  it('uses the supplied Rogue price in Mexican pesos', () => {
    expect(rogue && vehicleSpec(rogue, 'Precio')).toBe('$195,000 MXN');
  });
  it('records Estado general as Excelentes condiciones and omits Mecánicamente al cien', () => {
    expect(rogue && vehicleSpec(rogue, 'Estado general')).toBe('Excelentes condiciones');
    expect(rogue?.sellerNotes).not.toContain('Mecánicamente al cien');
    expect(Object.values(rogue?.specs ?? {})).not.toContain('Mecánicamente al cien');
  });
  it.each([
    ['Kilometraje', '85.000 km'], ['Cilindros', '4'], ['Transmisión', 'Automática'],
    ['Combustible', 'Gasolina'], ['Tracción', 'AWD'], ['Color exterior', 'Azul'], ['Color interior', 'Negro'],
    ['Disponibilidad', 'Disponible'], ['Motor', 'Consultar información'], ['Ubicación', 'Consultar información'],
  ])('records the supplied Rogue %s', (field, value) => { expect(rogue && vehicleSpec(rogue, field)).toBe(value); });
  it('preserves Rogue equipment and seller documentation', () => {
    expect(rogue?.equipment).toEqual(['Modo Eco', 'Pantalla', 'Cámara de reversa', 'Sensores de rebase', 'Sensor radar de alcance', 'Llave de presencia', 'Encendido de botón', 'Llantas nuevas', 'Rines de lujo', 'Barras de techo con porta equipajes']);
    expect(rogue?.sellerNotes).toEqual(['Sin detalles', 'Interiores impecables', 'Legalizada por pedimento (Aduana)', 'Saldría facturada a nombre del comprador', 'Lista para placas de cualquier Estado de México']);
  });
  it('defines the five category identifiers in the required order', () => {
    expect(CATEGORY_OPTIONS.map(c => c.id)).toEqual(['sedan', 'suv', 'van', 'trabajo', 'deportivos']);
  });
  it('filters work pickups without relabeling classic coupes as sedans', () => {
    expect(CARS.filter(c => c.cat === 'trabajo').map(c => c.slug)).toEqual(['ram-1500']);
    expect(CARS.filter(c => c.cat === 'clasicos').map(c => c.slug)).toEqual(['cadillac-eldorado']);
    expect(CARS.filter(c => c.cat === 'suv').map(c => c.slug)).toEqual(['nissan-rogue-2018']);
    expect(CARS.filter(c => c.cat === 'van').map(c => c.slug)).toEqual(['toyota-sienna-2017']);
  });
  it('keeps supplied Jetta and Corolla prices and years and preserves the other vehicles', () => {
    expect(CARS.map(c => [c.name, c.year, c.price])).toEqual([
      ['Volkswagen Jetta', 2018, '$178,000'], ['Toyota Corolla', 2017, '$208,000'],
      ['Toyota Sienna', 2017, null], ['Ram 1500', 2023, '$45,500'],
      ['Nissan Rogue', 2018, '$195,000'], ['Cadillac Eldorado', 1959, '$88,000'],
    ]);
  });
  it('shows Consultar información for unknown data, not invented specifications', () => {
    for (const car of CARS) expect(vehicleSpec(car, 'VIN')).toBe('Consultar información');
    for (const car of CARS.filter(car => car.slug !== 'toyota-corolla-2017')) expect(vehicleSpec(car, 'Ubicación')).toBe('Consultar información');
  });
  it('does not fabricate additional photos', () => { for (const car of CARS) expect(car.photos).toEqual([{ src: car.img, label: 'Fotografía del catálogo' }]); });
  it('assigns different images to Ram and Sienna, and Cadillac and Chevrolet', () => {
    const ram = getVehicle('ram-1500');
    const van = getVehicle('toyota-sienna-2017');
    const cadillac = getVehicle('cadillac-eldorado');
    const suvRogue = getVehicle('nissan-rogue-2018');
    expect(ram).toBeDefined();
    expect(cadillac).toBeDefined();
    expect(van).toBeDefined();
    expect(ram?.img).not.toBe(van?.img);
    expect(cadillac?.img).not.toBe(chevrolet?.img);
  });
  it('resolves each car exclusively and rejects unknown vehicles', () => {
    expect(new Set(CARS.map(c => c.slug)).size).toBe(6);
    for (const car of CARS) { expect(getVehicle(car.slug)).toBe(car); expect(relatedVehicles(car).map(c => c.slug)).not.toContain(car.slug); }
    expect(getVehicle('unknown')).toBeUndefined();
  });
  it('does not create a WhatsApp link without a configured contact', () => { expect(whatsappLink('', 'Hola')).toBeUndefined(); expect(whatsappLink('https://example.com/123456789', 'Hola')).toBeUndefined(); });
  it('includes the selected vehicle name model and year in the WhatsApp message', () => {
    const message = 'Ford Mustang GT, modelo Mustang GT, año 2024';
    const link = whatsappLink('https://wa.me/12345678901', message);
    expect(link && new URL(link).searchParams.get('text')).toBe(message);
  });
});