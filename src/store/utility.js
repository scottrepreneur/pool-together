export const updateObject = (oldObject, updatedProps) => {
	return {
		...oldObject,
		...updatedProps
	}
}