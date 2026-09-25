import { configureEnums, getEnum } from "shared-utils";
export { default as ImageMapPro } from "./image_map/ImageMapPro.jsx";
export { default as PlanGrid } from "./plans/PlanGrid.jsx";
export { default as Dashboard } from "./views/Dashboard.jsx";
configureEnums({
        AsesorCategories : ["Interno", "Externo", "Inmobiliario"],
        AsesorStatus : ["Activo", "Inactivo"],
        ClientCategories : ["Nuevo", "Perfilado", "Negociación", "Cerrado"],
        ClientPriorities : ["Alta", "Media", "Baja"],
        QuotationStatus : ["Pendiente", "Enviada", "Cancelada"],
        UnitsStatus : ["Disponible", "Vendido", "Apartado", "Bloqueado"],
    });
