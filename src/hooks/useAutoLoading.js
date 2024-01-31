/**
 * @param defaultLoading
 * @description 在给run方法传入一个promise，会在promise执行前或执行后将loading状态设为true，在执行完成后设为false
 */

import { ref } from 'vue';
export function useAutoLoading(defaultLoading = false) {
  const ld = ref(defaultLoading);

  function run(requestPromise) {
    ld.value = true;
    return requestPromise.finally(() => {
      ld.value = false;
    });
  }

  return [ld, run];
}
