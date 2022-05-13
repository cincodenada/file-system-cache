import { expect } from 'chai';
import { FileSystemCache, fs, fsPath, Util } from '../cache';

export { FileSystemCache, fs, fsPath, Util, expect };

export const BASE_PATH = './test/samples';

const deleteFolder = () => fs.removeSync(fsPath.resolve(BASE_PATH));
beforeEach(() => deleteFolder());
afterEach(() => deleteFolder());

/**
 * Checks for an error within an async function.
 * Example:
 *    Return the result of this function to the test-runner (mocha).
 *
 *        it('should throw', () =>
 *            expectError(async () => {
 *
 *                 <...code that throws here...>
 *
 *          }, 'my error message'));
 *
 */
export async function expectError(fn: () => Promise<any>, message?: string) {
  try {
    await fn();
  } catch (error: any) {
    if (message) {
      return expect(error.message || '').to.contain(message);
    } else {
      return error;
    }
  }
  const msg = message
    ? `Promise should fail with error message '${message || ''}'`
    : 'Promise should fail with error';
  return expect(undefined).to.be.a('Error', msg);
}