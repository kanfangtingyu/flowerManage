/**
 * Noopエラーを管理するクラス。（エラーハンドリング）
   @module /errors/idpf-noop-error
 * @author IBM
 */

/**
 * Noopエラークラス.
 */
class IdpfNoopError extends Error {
  /**
   * コンストラクタ.
   * @param {String} message エラーメッセージ
   * @param {String} id メッセージID
   * @param {Object} cause エラー原因
   */
  constructor(message, id, cause) {
    super(message)
    this.name = 'idpf-noop-error'
    this.id = id
    this.cause = cause
  }
}

export default IdpfNoopError
