'use strict';
module.exports = function(app) {
  var genError = require(app.rootDir + '/lib/error');
  var ensureAuth = require(app.rootDir + '/lib/ensureAuth');
  var logger = require(app.rootDir + '/lib/logger');

  var routeConfig =
  { POST:
    { '':
      [ ensureAuth
      , create
      ]
    }
  , GET:
    { '':
      [ ensureAuth
      , all
      ]
    , '/:<%= params[params.length - 1] %>':
      [ ensureAuth
      , byId
      ]
    }
  , PUT:
    { '/:<%= params[params.length - 1] %>':
      [ ensureAuth
      , update
      ]
    }
  , DELETE:
    { '/:<%= params[params.length - 1] %>':
      [ ensureAuth
      , remove
      ]
    }
  };

  return routeConfig;

  /**
   * Create a <%= className %> reference
   * @name <%= className %>#create
   * @return {object} body
   */
  /**
   * @swagger
   * <%= pathWithAllButLastParam %>:
   *  post:
   *    operationId: OP_ID
   *    summary: MESSAGE
   *    produces:
   *      - application/json
   *    tags:
   *      - TAG
   *    responses:
   *      200:
   *        description: Success
   *        schema:
   *          type: object
   *          $ref: '#/definitions/MODEL'
   */
  function *create() {
    var body = this.request.body;
    try {

    } catch (e) {

    }
    return this.body;
  }

  /**
   * Get a list of <%= className %>
   * @name <%= className %>#all
   * @return {object} body
   */
  /**
   * @swagger
   * <%= pathWithAllButLastParam %>:
   *   get:
   *     operationId: OP_ID
   *     summary: Returns list of routes with roles
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Array of <% className %>
   *         schema:
   *          type: array
   *          items:
   *            $ref: '#/definitions/MODEL'
   */
  function *all() {
    try {

    } catch (e) {
      this.status = 500;
      this.body =
        { error: true
        , msg: e.errors || e.message
        };
    }
    return this.body;
  }

  /**
   * Get a <%= className %> by id
   * @name <%= className %>#byId
   * @return {object} body
   */
  /**
   *  @swagger
   *  <%= pathWithAllParams %>:
   *    get:
   *      operationId: OP_ID
   *      summary: SUMMARY
   *      parameters:
<%_ for (var i = 0; i < params.length; i++) { _%>
   *        - name: <%= params[i] %>
   *          in: path
   *          type: integer
   *          required: true
   *          description: ID of <%= route.split('/')[i].replace(/s$/, ''); %>
<%_ } _%>
   */
  function *byId() {
    <% for (var i = 0; i < params.length; i++) { %>
    var <%= params[i] %> = this.params.<%= params[i] %>;
    <% } %>
    try {

    } catch (e) {
      this.status = 404;
      this.body =
        { error: true
        , msg: 'Item not found'
        };
    }
    return this.body;
  }

  /**
   * Update a <%= className %> by id
   * @name <%= className %>#update
   * @return {object} body
   */
  /**
   *  @swagger
   *  <%= pathWithAllParams %>:
   *    put:
   *      operationId: OP_ID
   *      summary: SUMMARY
   *      parameters:
<%_ for (var i = 0; i < params.length; i++) { _%>
   *        - name: <%= params[i] %>
   *          in: path
   *          type: integer
   *          required: true
   *          description: ID of <%= route.split('/')[i].replace(/s$/, ''); %>
<%_ } _%>
   */

  function *update() {
    <% for (var i = 0; i < params.length; i++) { %>
    var <%= params[i] %> = this.params.<%= params[i] %>;
    <% } %>
    var body = this.request.body;
    try {

    } catch (e) {
      this.status = 400;
      this.body =
        { error: true
        , msg: e.errors || e.message
        , errNo: 400
        , errCode: 'INVALID_PARAMETERS'
        };
    }
    return this.body;
  }

  /**
   * Delete <%= className %> by id
   * @name <%= className %>#remove
   * @return {object} body
   */
  /**
   *  @swagger
   *  <%= pathWithAllParams %>:
   *    delete:
   *      operationId: OP_ID
   *      summary: SUMMARY
   *      parameters:
<%_ for (var i = 0; i < params.length; i++) { _%>
   *        - name: <%= params[i] %>
   *          in: path
   *          type: integer
   *          required: true
   *          description: ID of <%= route.split('/')[i].replace(/s$/, ''); %>
<%_ } _%>
   */

  function *remove() {
    <% for (var i = 0; i < params.length; i++) { %>
    var <%= params[i] %> = this.params.<%= params[i] %>;
    <% } %>
    try {

      this.status = 204;
      this.body = genError('NO_CONTENT');
    } catch (e) {
      this.status = 500;
      this.body =
        { error: true
        , msg: e.errors || e.message
        };
    }
    return this.body;
  }
};
