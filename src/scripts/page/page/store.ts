export async function changePageData(key: string, pageData: YTPageData, responseStore: YTResponseStore) {
    const response = await responseStore.get(key);
    const copy = {...response.data};
    
    copy.innertubeResponse = pageData;
    responseStore.putInternal(key, copy);
}

export async function duplicate(copyFromKey: string, copyToKey: string, responseStore: YTResponseStore) {
    const response = await responseStore.get(copyFromKey);
    const copy = {...response.data};

    copy.key = copyToKey
    responseStore.putInternal(copyToKey, copy);
}
