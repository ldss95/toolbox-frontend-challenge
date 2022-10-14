/**
 * Si ya se habia llamado al API y aun esta pendiente, aborta
 */
export function handleAbort(ref) {
	if (ref.current) {
		ref.current.abort();
	}

	const controller = new AbortController();
	ref.current = controller;

	return controller.signal;
}

/**
 * Esta funcion actualiza la referencia isMounted a false para evitar intentar actualizar el estado
 * despues que el componente / hook ha sido desmontado
 * Tambien envia la señal de cancelacion de request, en caso de que haya alguna el proceso
 */
export function handleHookUnmount(isMounted, abortController) {
	if (abortController) {
		abortController.current?.abort();
	}

	if (isMounted) {
		isMounted.current = false;
	}
}