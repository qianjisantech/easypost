/**
 * 解析包含 pm.environment.set() 的代码并提取所有变量赋值
 * @param {string} codeString 包含环境变量设置的JS代码
 * @returns {Promise<Array<{name: string, value: any}>>} 变量赋值列表
 */
export async function parseEnvironmentSets(codeString) {
  return new Promise((resolve, reject) => {
    try {
      // 创建模拟的 pm 环境
      const mockPm = {
        environment: {
          sets: [],
          set: function(name, value) {
            this.sets.push({ name, value });
          },
          get: function(name) {
            const found = this.sets.find(item => item.name === name);
            return found ? found.value : undefined;
          }
        }
      };

      // 执行代码字符串
      const wrappedCode = `
        (function(pm) {
          ${codeString}
          return pm.environment.sets;
        })({ environment: ${JSON.stringify(mockPm.environment)} });
      `;

      const sets = eval(wrappedCode);

      if (sets && sets.length > 0) {
        resolve(sets);
      } else {
        reject(new Error('未找到有效的 pm.environment.set() 调用'));
      }
    } catch (error) {
      reject(error);
    }
  });
}