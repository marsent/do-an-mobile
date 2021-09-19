// /**
//  * @swagger
//  * /auth/user/register:
//  *   post:
//  *     summary: Register new user
//  *     tags: ['Auth']
//  *     requestBody :
//  *          required : true
//  *          content :
//  *              application/json:
//  *                  schema :
//  *                      type : object
//  *                      properties:
//  *                          email :
//  *                              type : string
//  *                              required: true
//  *                          phone :
//  *                              type : string
//  *                              required: true
//  *                          password :
//  *                              type : string
//  *                              required: true
//  *                          date_of_birth :
//  *                              type : string
//  *                              required: true
//  *                          full_name :
//  *                              type : string
//  *                              required: true
//  *     responses:
//  *       201:
//  *         description: The list of the books
//  *
//  */

/**
 * @swagger
 * /auth/user/sign-in:
 *   post:
 *     summary: User sign in
 *     tags: ['Auth']
 *     requestBody :
 *          required : true
 *          content :
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties:
 *                          phone :
 *                              type : string
 *                              required: true
 *                          password :
 *                              type : string
 *                              required: true
 *     responses:
 *       200:
 *         description: Sign in successfully
 *
 */

/**
 * @swagger
 * /auth/lecture/sign-in:
 *   post:
 *     summary: Lecture sign in
 *     tags: ['Auth']
 *     requestBody :
 *          required : true
 *          content :
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties:
 *                          phone :
 *                              type : string
 *                              required: true
 *                          password :
 *                              type : string
 *                              required: true
 *     responses:
 *       200:
 *         description: Sign in successfully
 *
 */

/**
 * @swagger
 * /auth/admin/sign-in:
 *   post:
 *     summary: Admin sign in
 *     tags: ['Auth']
 *     requestBody :
 *          required : true
 *          content :
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties:
 *                          phone :
 *                              type : string
 *                              required: true
 *                          password :
 *                              type : string
 *                              required: true
 *     responses:
 *       200:
 *         description: Sign in successfully
 *
 */
