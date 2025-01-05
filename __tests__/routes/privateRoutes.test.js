import PrivateRoutes from "../../src/routes/privateRoutes";

describe("PrivateRoutes", () => {
  it("exports an array of routes with correct structure", () => {
    expect(Array.isArray(PrivateRoutes)).toBe(true);

    PrivateRoutes.forEach((route) => {
      expect(route).toMatchObject({
        regex: expect.any(String),
        path: expect.any(String),
        name: expect.any(String),
        exact: expect.any(Boolean),
      });

      // Check if component is a React.lazy component
      expect(route.component).toHaveProperty(
        "$$typeof",
        Symbol.for("react.lazy")
      );
    });
  });

  it("contains a route for the dashboard", () => {
    const dashboardRoute = PrivateRoutes.find(
      (route) => route.name === "dashboard"
    );
    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute.path).toBe("/dashboard");
  });

  it("contains a route for form creation", () => {
    const formCreateRoute = PrivateRoutes.find(
      (route) => route.name === "form.create"
    );
    expect(formCreateRoute).toBeDefined();
    expect(formCreateRoute.path).toBe("/form/create");
  });
});
