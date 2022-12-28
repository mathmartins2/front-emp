import { lazy } from "react";

export const ViewIntroduction = lazy(() => import("./view/client/introduction"));
export const ViewCreatedCliente = lazy(() => import("./view/client/create"));
export const ViewMobileCliente = lazy(() => import("./view/client/mobile"));
export const ViewListCliente = lazy(() => import("./view/client/list"));
export const ViewIntroductionService = lazy(() => import("./view/service/introduction"));
export const ViewCreatedService = lazy(() => import("./view/service/created"));
export const ViewListService = lazy(() => import("./view/service/list"));
export const ViewMobileService = lazy(() => import("./view/service/mobile"));
export const ViewAccount = lazy(() => import("./view/account/list"));
export const List = lazy(() => import("./view/account/list/List"));